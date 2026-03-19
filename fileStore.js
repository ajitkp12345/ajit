import 'dotenv/config';
import axios from 'axios';
import { config } from '../src/config.js';

(async () => {
  try {
    const res = await axios.get('https://webexapis.com/v1/webhooks', {
      headers: { Authorization: `Bearer ${config.BOT_TOKEN}` }
    });

    const hooks = res.data.items || [];
    if (!hooks.length) {
      console.log('No webhooks to delete.');
      process.exit(0);
    }

    for (const h of hooks) {
      await axios.delete(`https://webexapis.com/v1/webhooks/${h.id}`, {
        headers: { Authorization: `Bearer ${config.BOT_TOKEN}` }
      });
      console.log('🗑️ Deleted webhook:', h.id, h.name);
    }
  } catch (err) {
    console.error('❌ Failed to remove webhooks:', err.response?.data || err.message);
    process.exit(1);
  }
})();
