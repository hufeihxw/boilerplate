import path from 'path';

module.exports =
{
	server:
	{
		input: path.join(process.cwd(), 'src', 'server', 'page', 'server.js'),
		output: path.join(process.cwd(), 'build', 'server', 'page', 'server.js')
	}
}
