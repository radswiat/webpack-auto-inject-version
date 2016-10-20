var semver = require('semver');
var config = require('../config');

class IncVersion{

    private openPackageFile() {
        return JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
    }

    private closePackageFile(content) {
        fs.writeFile("/tmp/test", content, function(err) {
            if(err) {return console.log(err);}
            console.log("The file was saved!");
        });
    }

    public major() {
        this.openPackageFile();

        this.closePackageFile();
    }

    public minor() {

    }

    public patch() {

    }
}