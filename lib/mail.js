import nodemailer from 'nodemailer';

function getSmtpConfig() {
    const user = process.env.SMTP_USER || process.env.SMPT_USER;
    const pass = process.env.SMTP_APP_PASSWORD;
    const to = process.env.CONTACT_EMAIL;

    if (!user || !pass || !to) {
        throw new Error('SMTP is not configured. Set SMTP_USER, SMTP_APP_PASSWORD, and CONTACT_EMAIL.');
    }

    const port = Number(process.env.SMTP_PORT || 587);

    return {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port,
        secure: process.env.SMTP_SECURE === 'true' || port === 465,
        user,
        pass,
        to
    };
}

/** Reuse one pooled SMTP connection — avoids ~2–5s TLS handshake on every request in dev. */
let transport;

function getTransport() {
    if (transport) return transport;

    const config = getSmtpConfig();
    transport = nodemailer.createTransport({
        pool: true,
        maxConnections: 1,
        maxMessages: 100,
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass
        },
        connectionTimeout: 12_000,
        greetingTimeout: 12_000,
        socketTimeout: 20_000
    });

    return transport;
}

export async function sendContactEmail({ name, email, topicLabel, message }) {
    const config = getSmtpConfig();
    const mailer = getTransport();

    const subject = `${topicLabel} — ${name}`;
    const text = `${message.trim()}\n\n—\nTopic: ${topicLabel}\nFrom: ${name}\nReply-To: ${email}`;

    const safeName = name.replace(/["<>]/g, '').slice(0, 120);

    await mailer.sendMail({
        from: {
            name: safeName || 'Website enquiry',
            address: config.user
        },
        to: config.to,
        replyTo: email,
        subject,
        text
    });
}
