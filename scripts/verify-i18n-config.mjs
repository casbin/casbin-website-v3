#!/usr/bin/env node

/**
 * i18n Configuration Verification Script
 * 验证 i18n 配置是否正确设置
 */

import fs from 'fs';
import path from 'path';

const checks = [];
const warnings = [];
const errors = [];

console.log('🔍 检查 i18n 配置...\n');

// Check 1: i18n.ts file
console.log('✓ 检查 src/lib/i18n.ts...');
const i18nFile = path.join(process.cwd(), 'src/lib/i18n.ts');
if (fs.existsSync(i18nFile)) {
  const content = fs.readFileSync(i18nFile, 'utf-8');
  if (content.includes('defineI18n') && content.includes('languages') && content.includes("'cn'")) {
    checks.push('✅ i18n.ts 配置正确');
  } else {
    errors.push('❌ i18n.ts 缺少必要配置');
  }
} else {
  errors.push('❌ src/lib/i18n.ts 文件不存在');
}

// Check 2: i18n-ui.tsx file (now in i18n-provider.tsx)
console.log('✓ 检查 src/components/i18n-provider.tsx...');
const i18nProviderFile = path.join(process.cwd(), 'src/components/i18n-provider.tsx');
if (fs.existsSync(i18nProviderFile)) {
  const content = fs.readFileSync(i18nProviderFile, 'utf-8');
  if (content.includes('defineI18nUI') && content.includes('translations') && content.includes('中文')) {
    checks.push('✅ i18n-provider.tsx 配置正确');
  } else {
    errors.push('❌ i18n-provider.tsx 缺少必要配置');
  }
} else {
  errors.push('❌ src/components/i18n-provider.tsx 文件不存在');
}

// Check 3: middleware.ts file
console.log('✓ 检查 middleware.ts...');
const middlewareFile = path.join(process.cwd(), 'middleware.ts');
if (fs.existsSync(middlewareFile)) {
  const content = fs.readFileSync(middlewareFile, 'utf-8');
  if (content.includes('i18n') && content.includes('middleware')) {
    checks.push('✅ middleware.ts 存在');
  } else {
    errors.push('❌ middleware.ts 配置不正确');
  }
} else {
  errors.push('❌ middleware.ts 文件不存在');
}

// Check 4: [locale] layout file
console.log('✓ 检查 src/app/[locale]/layout.tsx...');
const localeLayoutFile = path.join(process.cwd(), 'src/app/[locale]/layout.tsx');
if (fs.existsSync(localeLayoutFile)) {
  const content = fs.readFileSync(localeLayoutFile, 'utf-8');
  if (content.includes('generateStaticParams')) {
    checks.push('✅ [locale] 路由布局配置正确');
  } else {
    warnings.push('⚠️  [locale] 布局文件存在但可能不完整');
  }
} else {
  errors.push('❌ src/app/[locale]/layout.tsx 文件不存在');
}

// Check 5: source.ts i18n configuration
console.log('✓ 检查 src/lib/source.ts...');
const sourceFile = path.join(process.cwd(), 'src/lib/source.ts');
if (fs.existsSync(sourceFile)) {
  const content = fs.readFileSync(sourceFile, 'utf-8');
  if (content.includes('i18n') && content.includes("languages: i18n.languages")) {
    checks.push('✅ source.ts 已配置 i18n 支持');
  } else {
    warnings.push('⚠️  source.ts 中没有检测到 i18n 配置');
  }
} else {
  errors.push('❌ src/lib/source.ts 文件不存在');
}

// Check 6: Main layout.tsx i18n integration
console.log('✓ 检查 src/app/layout.tsx...');
const layoutFile = path.join(process.cwd(), 'src/app/layout.tsx');
if (fs.existsSync(layoutFile)) {
  const content = fs.readFileSync(layoutFile, 'utf-8');
  if (content.includes('provider') && content.includes('i18n-ui')) {
    checks.push('✅ layout.tsx 已集成 i18n provider');
  } else {
    warnings.push('⚠️  layout.tsx 可能需要更新以支持 i18n');
  }
} else {
  errors.push('❌ src/app/layout.tsx 文件不存在');
}

// Check 7: Chinese metadata files
console.log('✓ 检查中文元数据文件...');
const metadataFiles = [
  'content/docs/meta.cn.json',
  'content/docs/basics/_meta.cn.json',
  'content/docs/model/_meta.cn.json',
  'content/blog/_meta.cn.json',
];

let metadataCount = 0;
metadataFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    metadataCount++;
  }
});

if (metadataCount >= 4) {
  checks.push(`✅ 已创建 ${metadataCount} 个中文元数据文件`);
} else {
  warnings.push(`⚠️  仅找到 ${metadataCount} 个中文元数据文件，预期至少 4 个`);
}

// Check 8: Sample Chinese translation
console.log('✓ 检查中文翻译示例...');
const sampleTranslation = path.join(process.cwd(), 'content/docs/basics/overview.cn.mdx');
if (fs.existsSync(sampleTranslation)) {
  checks.push('✅ 已创建中文翻译示例文件');
} else {
  warnings.push('⚠️  未找到中文翻译示例文件');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 检查结果：\n');

if (checks.length > 0) {
  console.log('✅ 通过的检查：');
  checks.forEach((check) => console.log('  ' + check));
}

if (warnings.length > 0) {
  console.log('\n⚠️  警告：');
  warnings.forEach((warning) => console.log('  ' + warning));
}

if (errors.length > 0) {
  console.log('\n❌ 错误：');
  errors.forEach((error) => console.log('  ' + error));
}

console.log('\n' + '='.repeat(50));

const totalChecks = checks.length + warnings.length + errors.length;
const passedChecks = checks.length;
const passingPercentage = Math.round((passedChecks / totalChecks) * 100);

console.log(
  `\n总体状态：${passedChecks}/${totalChecks} 检查通过 (${passingPercentage}%)`
);

if (errors.length === 0 && warnings.length <= 2) {
  console.log(
    '\n✅ 恭喜！i18n 配置已完成，可以开始使用。\n'
  );
  console.log('📝 后续步骤：');
  console.log('  1. 运行 npm run dev 启动开发服务器');
  console.log('  2. 访问 http://localhost:3000/docs/overview (英文)');
  console.log('  3. 访问 http://localhost:3000/cn/docs/overview (中文)');
  console.log('  4. 为更多文档添加中文翻译\n');
  process.exit(0);
} else {
  console.log(
    '\n❌ 请修复上述错误，然后重新运行此脚本。\n'
  );
  process.exit(1);
}
