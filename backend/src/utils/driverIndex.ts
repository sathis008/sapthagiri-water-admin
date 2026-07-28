import Driver from '../models/driver.models';

/** Migrate the former non-sparse licence index used before office employees. */
export const ensureDriverLicenseIndex = async (): Promise<void> => {
  const indexes = await Driver.collection.indexes();
  const licenseIndex = indexes.find((index) => index.name === 'licenseNumber_1');

  if (licenseIndex?.sparse) return;

  // Empty licence values belong to office employees and must not participate in
  // a unique index. Removing them is safe because they are not valid licences.
  await Driver.collection.updateMany(
    { licenseNumber: { $in: ['', null] } },
    { $unset: { licenseNumber: '', licenseExpiry: '', licenseDocument: '', assignedVehicleId: '' } },
  );

  if (licenseIndex?.name) await Driver.collection.dropIndex(licenseIndex.name);
  await Driver.collection.createIndex({ licenseNumber: 1 }, { name: 'licenseNumber_1', unique: true, sparse: true });
};
