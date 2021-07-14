const fs = require('fs');

const repoPath = './repository.json';

const handleRepo = () => {
    const repoFile = JSON.parse(fs.readFileSync(repoPath, 'utf8'));

    if (repoFile.status === 'released' && repoFile['region-type'] === 'multi-region') {
        return;
    }

    repoFile.status = 'released';
    repoFile['region-type'] = 'multi-region';

    const newRepoFile = JSON.stringify(repoFile, null, 2) + '\n';
    fs.writeFileSync(repoPath, newRepoFile, 'utf8');
}

try {
    handleRepo();

    console.log('All done for repo');
} catch (e) {
    console.log(e);
}
