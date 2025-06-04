$(document).ready(function () {
    $(".counter-card").each(function () {
        const card = $(this);
        const startText = card.find(".start").text().trim();

        // Convert DD/MM/YYYY → MM/DD/YYYY for correct Date parsing in JS
        const parts = startText.split("/");
        const safeDateStr = `${parts[1]}/${parts[0]}/${parts[2]}`;
        const startDate = new Date(safeDateStr);

        const counterDisplay = card.find(".counter");

        const interval = setInterval(() => {
            const now = new Date();
            const diffMs = now - startDate;

            if (isNaN(diffMs)) {
                counterDisplay.text("Invalid date");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            counterDisplay.text(`${days} Days`);
        }, 60000);
    });
});
