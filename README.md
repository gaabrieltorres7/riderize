<h1 align="center" style="font-weight: bold;">Riderize API 💻</h1>

<p align="center">
 • <a href="#technologies">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#colab">Collaborators</a>
</p>

<p align="center">
    <b>Create an API that will allow the creation of pedals by users, in addition to that other users will be able to view these pedals and join them so that on the scheduled day those who signed up can pedal in a group.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- NodeJS
- TypeScript
- Express
- PostgreSQL
- Docker
- PrismaORM

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- NodeJS
- Git
- Docker

<h3>Cloning</h3>

```bash
git clone https://github.com/gaabrieltorres7/riderize
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env`

```yaml
POSTGRES_DB=example
POSTGRES_USER=example
POSTGRES_PASSWORD=example
APP_PORT=3000
DATABASE_URL=postgresql://example:example@localhost:5432/example?schema=public
JWT_SECRET=example
```

<h3>Starting</h3>

```bash
cd riderize
npm i
docker compose up
```

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/98062444?v=4" width="100px;" alt="Gabriel Torres Profile Picture"/><br>
        <sub>
          <b>Gabriel Torres</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h3>If you want to contribute, here are some documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
