const fs = require('fs');
const yaml = require('js-yaml');

const helmChartPath = '.deploy/helm/Chart.yaml';

const handleHelmChart = () => {
    const helmChartFile = yaml.load(fs.readFileSync(helmChartPath, 'utf8'));

    if (helmChartFile.dependencies[0].version === '0.21.0') {
        return;
    }

    const { version } = helmChartFile;
    const [major, minor, patch] = version.split('.');
    const newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;

    helmChartFile.dependencies[0].version = '0.21.0';
    helmChartFile.version = newVersion;

    const newHelmChartFile = yaml.dump(helmChartFile);
    fs.writeFileSync(helmChartPath, newHelmChartFile, 'utf8');
}

try {
    handleHelmChart();

    console.log('All done for helm');
} catch (e) {
    console.log(e);
}
