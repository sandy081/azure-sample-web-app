/* global __dirname */

import * as express from 'express';
import * as exphbs from 'express-handlebars';

const app = express();

// View configuration
app.engine('handlebars', exphbs({ compilerOptions: undefined }));
app.set('view engine', 'handlebars');

// Pages
app.get('/', (req: express.Request, res: express.Response) => {
	res.render('index');
});

const server = app.listen(process.env.PORT || 3000, () => {
	const { address, port } = server.address();
	console.log('server listening on ' + address + ':' + port);
});