$(document).ready(function () {
    $(".counter-card").each(function () {
        const card = $(this);
        const splitedStartDAte = $(".start").text().split('/')
        const startDate = `${splitedStartDAte[1]}/${splitedStartDAte[0]}/${splitedStartDAte[2]}`
        function updateCounter() {
            const days = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
            card.find(".counter").text(`${days} Days`);
            if($("#currentCounter").text()>=$("#max_record").text()) $("#max_record").text(`${days} Days`)
        }
        updateCounter();
        setInterval(updateCounter, 60000);
    });
});
