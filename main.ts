import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface GitHubPublisherSettings {
	githubRepo: string;
	githubBranch: string;
	githubToken: string;
}

const DEFAULT_SETTINGS: GitHubPublisherSettings = {
	githubRepo: 'username/repo', // 例如：wen/projects
	githubBranch: 'main',
	githubToken: '',
};

export default class GitHubPublisherPlugin extends Plugin {
	settings: GitHubPublisherSettings;

	async onload() {
		await this.loadSettings();

		// 添加命令
		this.addCommand({
			id: 'publish-note',
			name: 'Publish Note to GitHub',
			callback: () => this.publishNote(),
		});

		// 添加一个按钮到侧边栏
		this.addRibbonIcon('upload-cloud', 'Publish Note', (evt: MouseEvent) => {
			this.publishNote();
		});

		// 添加设置界面
		this.addSettingTab(new GitHubPublisherSettingTab(this.app, this));
	}

	async publishNote() {
		const file = this.app.workspace.getActiveFile();
		if (!file) {
			new Notice('No active note found!');
			return;
		}

		// 读取笔记内容
		const content = await this.app.vault.read(file);

		// 上传到 GitHub
		try {
			const response = await this.uploadToGitHub(file.name, content);
			if (response.status === 200 || response.status === 201) {
				new Notice('Note published successfully!');
			} else {
				new Notice('Failed to publish note. Check the console for details.');
				console.error('GitHub API response:', response);
			}
		} catch (error) {
			console.error('Failed to publish note:', error);
			new Notice('Failed to publish note. Check the console for details.');
		}
	}

	async uploadToGitHub(fileName: string, content: string) {
		const url = `https://api.github.com/repos/${this.settings.githubRepo}/contents/source/_posts/${fileName}`;

		// 获取文件的 sha 值（如果文件已存在）
		let sha: string | undefined;
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': `token ${this.settings.githubToken}`,
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				sha = data.sha;
			}
		} catch (error) {
			if (error instanceof Error && !error.message.includes('404')) {
				console.error('Failed to get file sha:', error);
			  }
		}

		// 上传或更新文件
		const body = {
			message: `Publish note: ${fileName}`,
			content: Buffer.from(content).toString('base64'),
			branch: this.settings.githubBranch,
			sha: sha, // 如果文件已存在，提供 sha 值
		};

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Authorization': `token ${this.settings.githubToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		return response;
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class GitHubPublisherSettingTab extends PluginSettingTab {
	plugin: GitHubPublisherPlugin;

	constructor(app: App, plugin: GitHubPublisherPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('GitHub Repository')
			.setDesc('The repository in the format "username/repo"')
			.addText(text => text
				.setPlaceholder('username/repo')
				.setValue(this.plugin.settings.githubRepo)
				.onChange(async (value) => {
					this.plugin.settings.githubRepo = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('GitHub Branch')
			.setDesc('The branch to publish to')
			.addText(text => text
				.setPlaceholder('main')
				.setValue(this.plugin.settings.githubBranch)
				.onChange(async (value) => {
					this.plugin.settings.githubBranch = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('GitHub Token')
			.setDesc('Your GitHub Personal Access Token')
			.addText(text => text
				.setPlaceholder('Enter your token')
				.setValue(this.plugin.settings.githubToken)
				.onChange(async (value) => {
					this.plugin.settings.githubToken = value;
					await this.plugin.saveSettings();
				}));
	}
}