const tg = window.Telegram?.WebApp || {
    expand: () => {},
    close: () => {}
};

tg.expand();

const countryEl = document.getElementById('country');
const stageEl = document.getElementById('stage');
const gradeEl = document.getElementById('grade');
const subjectEl = document.getElementById('subject');

init();

function init() {

    // 🌍 countries
    countryEl.innerHTML = '<option value="">-- اختر الدولة --</option>';

    Object.entries(COUNTRIES).forEach(([key, val]) => {
        countryEl.innerHTML += `<option value="${key}">${val.label}</option>`;
    });

    // 🗂️ units
    const unitEl = document.getElementById('unit');
    unitEl.innerHTML = '<option value="">-- اختر الوحدة --</option>';
    for (let i = 1; i <= 12; i++) {
        unitEl.innerHTML += `<option value="U${i}">الوحدة ${i}</option>`;
    }

    // 📖 lessons
    const lessonEl = document.getElementById('lesson');
    lessonEl.innerHTML = '<option value="">-- اختر الدرس --</option>';
    for (let i = 1; i <= 25; i++) {
        lessonEl.innerHTML += `<option value="${i}">الدرس ${i}</option>`;
    }

    bindEvents();
}

function bindEvents() {

    // 🌍 country → stages
    countryEl.onchange = () => {

        const selectedCountry = COUNTRIES[countryEl.value];
        if (!selectedCountry) return;

        stageEl.disabled = false;
        stageEl.innerHTML = '<option value="">-- اختر المرحلة --</option>';

        Object.entries(selectedCountry.stages).forEach(([key, label]) => {
            stageEl.innerHTML += `<option value="${key}">${label}</option>`;
        });

        showStep('step-stage');
    };

    // 🏫 stage → grades
    stageEl.onchange = () => {

        gradeEl.disabled = false;
        gradeEl.innerHTML = '<option value="">-- اختر الصف --</option>';

        for (let i = 1; i <= 12; i++) {
            gradeEl.innerHTML += `<option value="G${i}">الصف ${i}</option>`;
        }

        showStep('step-grade');
    };

    // 📚 grade → subjects
    gradeEl.onchange = () => {

        subjectEl.innerHTML = '<option value="">-- اختر المادة --</option>';

        SUBJECTS.forEach(s => {
            subjectEl.innerHTML += `<option value="${s}">${s}</option>`;
        });

        showStep('step-subject');
    };

    subjectEl.onchange = () => showStep('step-semester');
    document.getElementById('semester').onchange = () => showStep('step-unit');
    document.getElementById('unit').onchange = () => showStep('step-lesson');
    document.getElementById('lesson').onchange = () => showStep('step-final');

    document.getElementById('submitBtn').onclick = submit;
}

async function submit() {

    const country = countryEl.value;
    const stage = mapStage(stageEl.value);
    const grade = gradeEl.value;
    const subject = mapSubject(subjectEl.value);
    const semester = document.getElementById('semester').value;
    const unit = document.getElementById('unit').value;

    const finalCode = `${country}-${stage}-${grade}-${subject}-${semester}-${unit}`;

    console.log(finalCode);

    try {
        await fetch('https://nonvillainously-lymphoblastic-susan.ngrok-free.dev/webhook-test/c7bd9b6b-5edc-4625-b8c0-1c3254d8af4b', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: finalCode })
        });

        tg.close();

    } catch (e) {
        alert("فشل الإرسال ❌");
    }
}
