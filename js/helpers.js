function mapSubject(subject) {
    const map = {
        'العربية':'ARB',
        'الإنجليزية':'ENG',
        'الرياضيات':'MATH'
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