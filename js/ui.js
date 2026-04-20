let currentStep = 1;

function showStep(id) {
    document.getElementById(id).classList.add('active');
    document.getElementById(id).scrollIntoView({behavior:'smooth'});
    currentStep++;
    updateProgress();
}

function updateProgress() {
    const percent = (currentStep / 8) * 100;
    document.getElementById('progress-bar').style.width = percent + '%';
}