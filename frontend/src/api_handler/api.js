import axios from "axios";

async function Fetch_chats(user, receiver) {
    try {
        let response = await axios.get('http://localhost:3000/chats', {
            params: { user, receiver }
        });

        if (response && response.data) {
            return response;
        } else {
            return {data:'bye bye'};
        }
        
    } catch (error) {
        console.error('Error encountered while fetching chats:', error);
    }
};

export default Fetch_chats;
