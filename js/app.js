const tg = window.Telegram?.WebApp || {
    expand: () => {},
    close: () => {}
};

tg.expand();

/* =========================
   ELEMENTS
========================= */
const countryEl = document.getElementById('country');
const stageEl = document.getElementById('stage');
const gradeEl = document.getElementById('grade');
const branchEl = document.getElementById('branch');
const subjectEl = document.getElementById('subject');
const semesterEl = document.getElementById('semester');
const unitEl = document.getElementById('unit');
const lessonEl = document.getElementById('lesson');
const submitBtn = document.getElementById('submitBtn');

/* =========================
   INIT
========================= */
init();

function init() {

    // 🌍 Countries
    countryEl.innerHTML = '<option value="">-- اختر الدولة --</option>';
    Object.entries(COUNTRIES).forEach(([key, val]) => {
        countryEl.innerHTML += `<option value="${key}">${val.label}</option>`;
    });

    // 🗂 Units
    unitEl.innerHTML = '<option value="">-- اختر الوحدة --</option>';
    for (let i = 1; i <= 12; i++) {
        unitEl.innerHTML += `<option value="U${i}">الوحدة ${i}</option>`;
    }

    // 📖 Lessons
    lessonEl.innerHTML = '<option value="">-- اختر الدرس --</option>';
    for (let i = 1; i <= 25; i++) {
        lessonEl.innerHTML += `<option value="L${i}">الدرس ${i}</option>`;
    }

    bindEvents();
}

/* =========================
   EVENTS
========================= */
function bindEvents() {

    // 🌍 Country → Stage
    countryEl.onchange = () => {

        const country = COUNTRIES[countryEl.value];
        if (!country) return;

        stageEl.disabled = false;
        stageEl.innerHTML = '<option value="">-- اختر المرحلة --</option>';

        Object.entries(country.stages).forEach(([code, label]) => {
            stageEl.innerHTML += `<option value="${code}">${label}</option>`;
        });

        showStep('step-stage');
    };

    // 🏫 Stage → Grade
    stageEl.onchange = () => {

    const country = countryEl.value;
    const stage = stageEl.value;

    gradeEl.disabled = false;
    gradeEl.innerHTML = '<option value="">-- اختر الصف --</option>';

    const grades = GRADES_BY_STAGE[country]?.[stage] || [];

    grades.forEach(g => {
    gradeEl.innerHTML += `<option value="G${g}">📚 الصف ${g}</option>`;    });

    showStep('step-grade');
};

    // 📚 Grade → Branch
    gradeEl.onchange = () => {

        branchEl.innerHTML = `
            <option value="">-- اختر الفرع --</option>
            <option value="ART">أدبي</option>
            <option value="SCI">علمي</option>
            <option value="IT">تكنولوجيا</option>
        `;

        showStep('step-branch');
    };

    // 📘 Branch → Subject
    branchEl.onchange = () => {

        subjectEl.innerHTML = '<option value="">-- اختر المادة --</option>';

        SUBJECTS.forEach(s => {
            subjectEl.innerHTML += `<option value="${s}">${s}</option>`;
        });

        showStep('step-subject');
    };

    // ➡️ Steps chain
    subjectEl.onchange = () => showStep('step-semester');
    semesterEl.onchange = () => showStep('step-unit');
    unitEl.onchange = () => showStep('step-lesson');
    lessonEl.onchange = () => showStep('step-final');

    submitBtn.onclick = submit;
}

/* =========================
   SUBMIT
========================= */
async function submit() {

    const country = countryEl.value;
    const stage = stageEl.value;
    const grade = gradeEl.value;
    const branch = branchEl.value;
    const subject = mapSubject(subjectEl.value);
    const semester = semesterEl.value;
    const unit = unitEl.value;
    const lesson = lessonEl.value;

    const finalCode =
        `${country}-${stage}-${grade}-${branch}-${subject}-${semester}-${unit}-${lesson}`;

    console.log("FINAL CODE:", finalCode);

    try {
        await fetch('https://nonvillainously-lymphoblastic-susan.ngrok-free.dev/webhook-test/c7bd9b6b-5edc-4625-b8c0-1c3254d8af4b', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: finalCode,
                user_id: tg.initDataUnsafe?.user?.id || "unknown"
            })
        });

        tg.close();

    } catch (e) {
        alert("فشل الإرسال ❌");
        console.error(e);
    }
}
