function mapSubject(subject) {
    const map = {
        'العربية': 'ARB',
        'الإنجليزية': 'ENG',
        'الرياضيات': 'MATH',
        'الدين': 'ISL',
        'العلوم': 'SCI',
        'الاجتماعيات': 'SOCST',
        'الفيزياء': 'PHY',
        'الكيمياء': 'CHEM',
        'الأحياء': 'BIO',
        'الحاسوب': 'CS'
    };
    return map[subject] || subject.toUpperCase();
}

function mapStage(stage) {
    return {
        elementary:'E',
        preparatory:'P',
        secondary:'S',
        basic:'E'
    }[stage] || 'X';
}