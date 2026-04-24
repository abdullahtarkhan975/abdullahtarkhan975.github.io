function mapSubject(subject) {
    const map = {
        'الفيزياء': 'PHY',
        'الكيمياء': 'CHEM',
        'الأحياء': 'BIO',
        'الرياضيات': 'MATH',
        'الإنجليزية': 'ENG',
        'العربية': 'ARB',
        'التربية الإسلامية': 'ISL',
        'العلوم': 'SCI',
        'الاجتماعيات': 'SOCST',
        'التاريخ': 'HIS',
        'الجغرافيا': 'GEO',
        'الحاسوب': 'CS',
        'تقنية رقمية': 'DIGIT',
        'تكنولوجيا المعلومات': 'IT',
        'الإدارة': 'MGMT',
        'المحاسبة': 'ACC',
        'القانون': 'LAW',
        'الاقتصاد': 'ECON',
        'التفسير': 'TAF',
        'الحديث': 'HAD',
        'الفقه': 'FIQ',
        'الدراسات النفسية': 'PSY',
        'الأمن السيبراني': 'CYBER',
        'علم البيانات': 'DS'
    };
    return map[subject] || subject.toUpperCase();
}

function mapStage(stage) {
    return {
        elementary: 'E',
        preparatory: 'P',
        secondary: 'S',
        basic: 'E'
    }[stage] || 'X';
}