import jsPDF from 'jspdf';

async function copyText(content: string | Promise<string>) {
	if (navigator.clipboard && window.isSecureContext) {
		try {
			await navigator.clipboard.writeText(await content);
			return true;
		} catch (error) {
			console.error('Clipboard write failed:', error);
			return false;
		}
	}
	return false;
}

async function saveToPDF(html: string | Promise<string>) {
	const pdf = new jsPDF();

	try {
		await pdf.html(html.toString(), {
			callback: function (doc) {
				doc.save('markdown-formatted-document.pdf');
			},
			x: 10,
			y: 10,
			width: 180, // max width
			windowWidth: 800,
			margin: [10, 10, 10, 10],
		});
	} catch (error) {
		console.error('PDF generation failed:', error);
	}
}

export { copyText, saveToPDF };
