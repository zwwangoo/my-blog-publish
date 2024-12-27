import esbuild from 'esbuild';

const buildOptions = {
  entryPoints: ['main.ts'],
  bundle: true,
  outfile: 'main.js',
  platform: 'node', // 设置为 'node'，以支持 Node.js 内置模块
  external: ['obsidian'], // 将 'obsidian' 标记为外部依赖
};

async function build() {
  await esbuild.build(buildOptions);
  console.log('Build complete!');
}

build();
