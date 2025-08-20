<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			Created by <a href="https://github.com/iotamale/online-markdown-editor">iotamale</a>
		</p>
		<p>
			<strong>123</strong> words
		</p>
		<p>
			<strong>143</strong> lines
		</p>
		<p>
			<strong>Ln 17, Col 18</strong>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0;
		width: 100%;
		margin: 0;
		box-sizing: border-box;
	}

	footer {
		position: sticky;
		bottom: 0;
		background: #408be0;
		color: #fff;
		/* z-index: 10; */
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: left;
		padding: 0;
		margin: 0;
	}

	footer p {
		margin: 0.25rem 0.5rem 0.25rem 0.25rem;
		/* margin-right: 10px;
        margin-left: 1rem */
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

	@media (min-width: 480px) {
		footer {
			padding: 0;
		}
	}
</style>
