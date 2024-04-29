import Rsync from 'rsync';

const rsync = new Rsync()
    .set('rsh', 'ssh -i ~/.ssh/id_rsa')
    .flags('az')
    .source('./server')
    .source('./public')
    .destination('root@194.146.25.179:/root/libHost');

rsync.execute(function (error, code, cmd) {
    if (error) {
        return console.error(error);
    }
    console.log('done');
});
