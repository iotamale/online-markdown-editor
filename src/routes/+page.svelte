<script lang="ts">
	import { marked } from 'marked';

	import welcomeText from '../lib/text/welcome.txt?raw';
	let markdownInput = welcomeText;

	let leftPaneWidth = 50; // percentage
	let isDragging = false;
	let editorContainer: HTMLElement;
	let wordCount, lineCount;

	let textareaElement: HTMLTextAreaElement;
	let cursorLine, cursorColumn;

	marked.setOptions({
		breaks: true,
		gfm: true,
	});

	$: htmlOutput = marked(markdownInput);
	$: wordCount = markdownInput.split(/\s+/).filter(Boolean).length;
	$: lineCount = markdownInput.split('\n').length;

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		event.preventDefault();
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	}

	function updateCursorPosition() {
		if (!textareaElement) return;
		const cursorPos = textareaElement.selectionStart;
		const textBeforeCursor = markdownInput.substring(0, cursorPos);

		cursorLine = textBeforeCursor.split('\n').length;

		const lastNewlineIndex = textBeforeCursor.lastIndexOf('\n');
		cursorColumn = cursorPos - lastNewlineIndex;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging || !editorContainer) return;

		const containerRect = editorContainer.getBoundingClientRect();
		const newWidth = ((event.clientX - containerRect.left) / containerRect.width) * 100;

		leftPaneWidth = Math.min(Math.max(newWidth, 20), 80); // Between 20p and 80p for better looks
	}

	function handleMouseUp() {
		isDragging = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}
</script>

<svelte:head>
	<title>Markdown Editor</title>
	<meta name="description" content="Simple online markdown editor" />
</svelte:head>

<div class="page-container">
	<div class="editor-container" bind:this={editorContainer}>
		<div class="editor-pane" style="width: {leftPaneWidth}%">
			<textarea
				bind:value={markdownInput}
				bind:this={textareaElement}
				on:click={updateCursorPosition}
				on:keyup={updateCursorPosition}
				on:keydown={updateCursorPosition}
				class="markdown-input"
			></textarea>
		</div>

		<div class="slider" on:mousedown={handleMouseDown} class:dragging={isDragging}>
			<div class="slider-handle"></div>
		</div>

		<div class="preview-pane" style="width: {100 - leftPaneWidth}%">
			<div class="preview-content">
				{@html htmlOutput}
			</div>
		</div>
	</div>

	<footer>
		<p>
			Created by <a href="https://github.com/iotamale/online-markdown-editor">iotamale</a>
		</p>
		<p>
			<strong>{markdownInput.length + 1}</strong> bytes
		</p>
		<p>
			<strong>{wordCount}</strong> words
		</p>
		<p>
			<strong>{lineCount}</strong> lines
		</p>
		<p>
			<strong>Ln {cursorLine || 1}, Col {cursorColumn || 1}</strong>
		</p>
	</footer>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.editor-container {
		display: flex;
		flex: 1;
		overflow: hidden;
		user-select: none;
	}

	footer {
		position: sticky;
		bottom: 0;
		background: #408be0;
		color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: left;
		padding: 0;
		margin: 0;
	}

	footer p {
		margin: 0.25rem 0.5rem 0.25rem 0.25rem;
		padding: 0;
		font-size: 0.8rem;
	}

	footer p strong {
		font-weight: bold;
		color: #fff;
	}

	footer p a {
		font-weight: bold;
		text-decoration: underline;
		color: #fff;
	}

	.editor-pane {
		display: flex;
		flex-direction: column;
		background-color: #fafafa;
		min-width: 200px;
	}

	.preview-pane {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		overflow-y: auto;
		min-width: 200px;
	}

	.slider {
		width: 6px;
		background-color: #e0e0e0;
		cursor: col-resize;
		position: relative;
		transition: background-color 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slider:hover {
		background-color: #d0d0d0;
	}

	.slider.dragging {
		background-color: #4075a6;
	}

	.slider-handle {
		width: 2px;
		height: 40px;
		background-color: #999;
		border-radius: 1px;
		transition: background-color 0.2s ease;
	}

	.slider:hover .slider-handle {
		background-color: #666;
	}

	.slider.dragging .slider-handle {
		background-color: #fff;
	}

	.markdown-input {
		flex: 1;
		width: 100%;
		height: 100%;
		padding: 20px;
		border: none;
		outline: none;
		/* font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; */
		font-size: 14px;
		line-height: 1.6;
		resize: none;
		background-color: #fafafa;
		color: #333;
	}

	.preview-content {
		padding: 20px;
		max-width: none;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		line-height: 1.6;
		color: #333;
	}

	.preview-content :global(h1) {
		font-size: 2em;
		font-weight: 600;
		margin: 0.67em 0;
		padding-bottom: 0.3em;
		border-bottom: 1px solid #eaecef;
		text-align: left;
	}

	.preview-content :global(h2) {
		font-size: 1.5em;
		font-weight: 600;
		margin: 0.83em 0;
		padding-bottom: 0.3em;
		border-bottom: 1px solid #eaecef;
	}

	.preview-content :global(h3) {
		font-size: 1.25em;
		font-weight: 600;
		margin: 1em 0;
	}

	.preview-content :global(p) {
		margin: 1em 0;
	}

	.preview-content :global(strong) {
		font-weight: 600;
	}

	.preview-content :global(em) {
		font-style: italic;
	}

	.preview-content :global(code) {
		background-color: rgba(175, 184, 193, 0.2);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	.preview-content :global(pre) {
		background-color: #f6f8fa;
		border-radius: 6px;
		padding: 16px;
		overflow: auto;
		margin: 1em 0;
	}

	.preview-content :global(pre code) {
		background-color: transparent;
		padding: 0;
		font-family: var(--font-mono);
	}

	.preview-content :global(ul),
	.preview-content :global(ol) {
		margin: 1em 0;
		padding-left: 2em;
	}

	.preview-content :global(li) {
		margin: 0.5em 0;
	}

	.preview-content :global(blockquote) {
		border-left: 4px solid #ddd;
		margin: 1em 0;
		padding: 0 1em;
		color: #666;
		font-style: italic;
	}

	.preview-content :global(hr) {
		border: none;
		border-top: 1px solid #eaecef;
		margin: 2em 0;
	}

	.preview-content :global(a) {
		color: #0366d6;
		text-decoration: none;
	}

	.preview-content :global(a:hover) {
		text-decoration: underline;
	}

	.preview-content :global(img) {
		max-width: 100%;
		height: auto;
	}

	.preview-content :global(table) {
		border-collapse: collapse;
		margin: 1em 0;
		width: 100%;
	}

	.preview-content :global(th),
	.preview-content :global(td) {
		border: 1px solid #ddd;
		padding: 8px 12px;
		text-align: left;
	}

	.preview-content :global(th) {
		background-color: #f6f8fa;
		font-weight: 600;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.editor-container {
			flex-direction: column;
		}

		.slider {
			width: 100%;
			height: 6px;
			cursor: row-resize;
		}

		.slider-handle {
			width: 40px;
			height: 2px;
		}

		.editor-pane,
		.preview-pane {
			min-width: auto;
			min-height: 200px;
		}
	}

	@media (min-width: 480px) {
		footer {
			padding: 0;
		}
	}
</style>
