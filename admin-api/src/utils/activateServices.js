const { connectDB, Service } = require('../config/db');

(async () => {
  try {
    await connectDB();
    const result = await Service.updateMany({}, { isActive: true });
    console.log(`✓ Successfully updated ${result.modifiedCount || result.matchedCount} services to isActive: true`);
  } catch (err) {
    console.error('Error activating services:', err);
  } finally {
    process.exit(0);
  }
})();
