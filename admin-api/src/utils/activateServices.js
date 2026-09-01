const db = require('../config/db');

(async () => {
  try {
    const services = await db.service.findMany({});
    for (const s of services) {
      await db.service.update({ where: { id: s.id }, data: { isActive: true } });
    }
    console.log(`✓ Successfully updated ${services.length} services to isActive: true`);
  } catch (err) {
    console.error('Error activating services:', err);
  } finally {
    process.exit(0);
  }
})();
