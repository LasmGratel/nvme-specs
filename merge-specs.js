const fs = require('fs');
const xbytes = require('xbytes');

let specs = JSON.parse(fs.readFileSync('static/specs.json'));



for (const spec of specs) {
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
        spec.iops_read = parseInt(spec.iops.split('/')[0]);
        spec.iops_write = parseInt(spec.iops.split('/')[1]);
        delete spec.iops;
    }
    if (spec.unraid) {
        spec.unraid = spec.unraid.toLowerCase() == 'yes';
    }
    if (spec.form_factor) {
        spec.form_factor = spec.form_factor.split(" or ")
    }
}

fs.writeFileSync('static/specs_modified.json', JSON.stringify(specs));