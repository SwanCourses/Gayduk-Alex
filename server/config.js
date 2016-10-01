const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/haiduk_course_app',
  port: process.env.PORT || 8000,
};

export default config;
