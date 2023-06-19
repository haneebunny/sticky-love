/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 설정 유지

  // 추가 설정
  ...require("next-fonts")(),
};

module.exports = nextConfig;
