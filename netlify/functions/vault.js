const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    
    try {
        const { text } = JSON.parse(event.body);
        
        // هنا الكود يسحب المفاتيح اللي أضفتها أنت في Netlify تلقائياً
        const botToken = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: text,
            parse_mode: "Markdown"
        });

        return { statusCode: 200, body: JSON.stringify({ status: "Success" }) };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
