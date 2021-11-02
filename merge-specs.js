const fs = require('fs');
const xbytes = require('xbytes');

let specs = JSON.parse(fs.readFileSync('static/specs.json'));

let models = {};

for (const spec of specs) {
    if (models[spec.model] == undefined) {
        models[spec.model] = [];
    }
    for (const key in spec) {
        if (spec[key] == undefined || spec[key] == '-----') {
            delete spec[key];
        }
    }
    if (spec.seq) {
        spec.seq_read = parseInt(spec.seq.split('/')[0]);
        spec.seq_write = parseInt(spec.seq.split('/')[1].split(' ')[0]);
        delete spec.seq;
    }
    if (spec.iops) {
        spec.iops_read = parseInt(spec.iops.split('/')[0]) * 1000;
        spec.iops_write = parseInt(spec.iops.split('/')[1]) * 1000;
        delete spec.iops;
    }
    if (spec.unraid) {
        spec.unraid = spec.unraid.toLowerCase() == 'yes';
    }
    if (spec.form_factor) {
        spec.form_factor = spec.form_factor.split(" or ")
    }
    if (spec.endurance) {
        spec.endurance = xbytes.parseSize(spec.endurance.split('W')[0]);
    }
    spec.capacity = xbytes.parseSize(spec.capacity);
    models[spec.model].push(spec);
}

fs.writeFileSync('static/models.json', JSON.stringify(models));