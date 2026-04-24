const tg = window.Telegram?.WebApp || {
    expand: () => { },
    close: () => { }
};

tg.expand();

const countryEl = document.getElementById('country');
const stageEl = document.getElementById('stage');
const gradeEl = document.getElementById('grade');
const branchEl = document.getElementById('branch');
const subjectEl = document.getElementById('subject');
const semesterEl = document.getElementById('semester');
const unitEl = document.getElementById('unit');
const lessonEl = document.getElementById('lesson');
const submitBtn = document.getElementById('submitBtn');


init();

function init() {

    countryEl.innerHTML = '<option value="">-- اختر الدولة --</option>';
    Object.entries(COUNTRIES).forEach(([key, val]) => {
        countryEl.innerHTML += `<option value="${key}">${val.label}</option>`;
    });

    unitEl.innerHTML = '<option value="">-- اختر الوحدة --</option>';
    for (let i = 1; i <= 12; i++) {
        unitEl.innerHTML += `<option value="U${i}">الوحدة ${i}</option>`;
    }

    lessonEl.innerHTML = '<option value="">-- اختر الدرس --</option>';
    for (let i = 1; i <= 25; i++) {
        lessonEl.innerHTML += `<option value="L${i}">الدرس ${i}</option>`;
    }

    bindEvents();
}

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

    stageEl.onchange = () => {

        const country = countryEl.value;
        const stage = stageEl.value;

        gradeEl.disabled = false;
        gradeEl.innerHTML = '<option value="">-- اختر الصف --</option>';

        const grades = GRADES_BY_STAGE[country]?.[stage] || [];

        grades.forEach(g => {
            gradeEl.innerHTML += `<option value="G${g}">📚 الصف ${g}</option>`;
        });

        showStep('step-grade');
    };

    gradeEl.onchange = () => {

        const g = parseInt(gradeEl.value.replace('G', ''));

        subjectEl.innerHTML = '<option value="">-- اختر المادة --</option>';

        if (g <= 10) {

            branchEl.value = 'GEN';

            let subs = [];

            subs.push('العربية', 'الإنجليزية', 'الرياضيات', 'التربية الإسلامية');

            if (g <= 9) {
                subs.push('العلوم', 'الاجتماعيات', 'الحاسوب');
            }

            if (g === 10) {
                subs.push(
                    'العلوم', 'الاجتماعيات', 'الحاسوب',
                    'الفيزياء', 'الكيمياء', 'الأحياء'
                );
            }

            subs.forEach(s => {
                subjectEl.innerHTML += `<option value="${s}">${s}</option>`;
            });

            showStep('step-subject');
            return;
        }

        branchEl.innerHTML = `
        <option value="">-- اختر الفرع --</option>
        <option value="SCI">علمي</option>
        <option value="ART">أدبي</option>
        <option value="TECH">تكنولوجيا</option>
    `;

        showStep('step-branch');
    };

    branchEl.onchange = () => {

        subjectEl.innerHTML = '<option value="">-- اختر المادة --</option>';

        let subs = ['العربية', 'الإنجليزية', 'الرياضيات', 'التربية الإسلامية'];

        if (branchEl.value === 'SCI') {
            subs.push('الفيزياء', 'الكيمياء', 'الأحياء', 'الحاسوب');
        }
        else if (branchEl.value === 'ART') {
            subs.push('التاريخ', 'الجغرافيا', 'الاجتماعيات', 'الحاسوب');
        }
        else if (branchEl.value === 'TECH') {
            subs.push('الفيزياء', 'الحاسوب', 'تكنولوجيا المعلومات');
        }

        subs.forEach(s => {
            subjectEl.innerHTML += `<option value="${s}">${s}</option>`;
        });

        showStep('step-subject');
    };

    subjectEl.onchange = () => showStep('step-semester');
    semesterEl.onchange = () => showStep('step-unit');
    unitEl.onchange = () => showStep('step-lesson');
    lessonEl.onchange = () => showStep('step-final');

    submitBtn.onclick = submit;
}


async function submit() {

    const country = countryEl.value;
    const stage = stageEl.value;
    const grade = gradeEl.value;
    const branch = branchEl.value || 'GEN';
    const subject = mapSubject(subjectEl.value);
    const semester = semesterEl.value;
    const unit = unitEl.value;
    const lesson = lessonEl.value;

    const finalCode =
        `${country}-${stage}-${grade}-${branch}-${subject}-${semester}-${unit}-${lesson}`;

    console.log("FINAL CODE:", finalCode);

    try {
        const WEBHOOK_URL = window.APP_CONFIG?.WEBHOOK_URL;

        await fetch(WEBHOOK_URL, {
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