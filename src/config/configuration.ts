export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  vendorDns: process.env.VENDOR_DNS,
});
