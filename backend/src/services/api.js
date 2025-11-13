import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const RECEIPT_API_URL = 'https://b812ce23c227.ngrok-free.app';
const DISCORD_API_URL = 'https://kissa-bot.onrender.com';

export const createOrder = async (order) => {
    const response = await axios.post(`${API_URL}/api/orders`, order);
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(`${API_URL}/api/orders`, { headers: { "Cache-Control": "no-cache" } });
    return response.data;
};

export const getFilteredOrders = async (date) => {
    const response = await axios.get(`${API_URL}/api/orders?date=${date}`);
    return response.data;
}

export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/api/orders/${id}`);
    return response.data;
};

export const getDailyItemCounts = async (date) => {
    const response = await axios.get(`${API_URL}/api/orders/daily-item-counts?date=${date}`);
    return response.data;
};

export const createHygiene = async (hygiene) => {
    const response = await axios.post(`${API_URL}/api/hygiene`, hygiene);
    return response.data;
};

export const getHygiene = async () => {
    const response = await axios.get(`${API_URL}/api/hygiene`);
    return response.data;
}

export const getFilteredHygiene = async (date, item) => {
    const response = await axios.get(`${API_URL}/api/hygiene?date=${date}&item=${item}`);
    return response.data;
}

export const deleteHygiene = async (id) => {
    const response = await axios.delete(`${API_URL}/api/hygiene/${id}`);
    return response.data;
}

export const getByIdItemStatus = async (id) => {
    const response = await axios.get(`${API_URL}/api/itemstatus/${id}`);
    return response.data;
}

export const updateItemStatus = async (id, status) => {
    const response = await axios.put(`${API_URL}/api/itemstatus/${id}`, { status });
    return response.data;
}

export const printReceipt = async (order) => {
    try {
        const response = await axios.post(`${RECEIPT_API_URL}/print`, order);
        return response.data;
    } catch (error) {
        console.error("Printing error :", error);
        throw error;
    }
};

export const printReceiptWaiter = async (order) => {
    try {
        const response = await axios.post(`${RECEIPT_API_URL}/print_waiter`, order);
        return response.data;
    } catch (error) {
        console.error("Printing error :", error);
        throw error;
    }
};

// send discord messag
export const sendDiscordMessage = async (order) => {
    try {
        const response = await axios.post(`${DISCORD_API_URL}/api/order`, { order });
        return response.data;
    } catch (error) {
        console.error("Discord message error :", error);
        throw error;
    }
};

