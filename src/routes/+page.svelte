<script lang="ts">
	let markdownInput = `This is a simple online Markdown editor.
# Funny text goes here`;

	let leftPaneWidth = 50; // percentage
	let isDragging = false;
	let editorContainer: HTMLElement;

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		event.preventDefault();
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
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

<div class="editor-container" bind:this={editorContainer}>
	<div class="editor-pane" style="width: {leftPaneWidth}%">
		<textarea bind:value={markdownInput} class="markdown-input"></textarea>
	</div>

	<div class="slider" on:mousedown={handleMouseDown} class:dragging={isDragging}>
		<div class="slider-handle"></div>
	</div>

	<div class="preview-pane" style="width: {100 - leftPaneWidth}%">
		<div class="preview-content">Text will be rendered here</div>
	</div>
</div>

<style>
	.editor-container {
		display: flex;
		height: 100vh;
		overflow: hidden;
		user-select: none;
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
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
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

	.preview-content h1 {
		font-size: 2em;
		font-weight: 600;
		margin: 0.67em 0;
		padding-bottom: 0.3em;
		border-bottom: 1px solid #eaecef;
	}

	.preview-content h2 {
		font-size: 1.5em;
		font-weight: 600;
		margin: 0.83em 0;
		padding-bottom: 0.3em;
		border-bottom: 1px solid #eaecef;
	}

	.preview-content p {
		margin: 1em 0;
	}

	.preview-content strong {
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
</style>
