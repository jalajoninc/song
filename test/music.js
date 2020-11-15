const directory = './music/';
const fs = require('fs');
const ffs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const statdir = util.promisify(fs.stat);

async function musicFiles(d) {
    let names;
    try {
      names = await readdir(directory + d);
    } catch (err) {
      console.log(err);
    }

    var rv = {};
    for( var i = 0; i < names.length; i++ ){
        if ( !names[i].startsWith('.') ){
            console.log('----', names[i]);
            rv['item'] = names[i];
        }
    }

    return( rv );
}

async function myF2(d) {
    let names;
    try {
      names = await readdir(directory + d);
    } catch (err) {
      console.log(err);
    }

    var rv = {};
    for( var i = 0; i < names.length; i++ ){
        if ( !names[i].startsWith('.') ){
            console.log('----', names[i]);
            let m = await musicFiles(d + '/' + names[i] );

            rv[names[i]] = m;
        }
    }

    return( rv );
}

async function myF() {
    let names;
    var dict = {};

    try {
      names = await readdir(directory);
    } catch (err) {
      console.log(err);
    }

    for( var i = 0; i < names.length; i++ ){
        let s = await statdir(directory + names[i] );
        if (s && s.isDirectory()) {
            console.log('--', names[i]);
            let rv = await myF2(names[i]);

            dict[names[i]] = rv;

            for ( key in rv ){
                console.log( key );
            }
            console.log(JSON.stringify(rv));

        } else {
            // console.log('No First Name', names[i]);
        }
    }

    let data = JSON.stringify(dict);
    fs.writeFileSync('music.json', data);

  }

  myF();
