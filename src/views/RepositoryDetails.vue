<template>
    <div class="repository-details">
      <div class="header">
        <h1 class="title">{{ repository.name }}</h1>
        <p class="description">{{ repository.description }}</p>
        <div class="meta">
          <div class="meta-item">
            <span class="iconify" data-icon="carbon:language" data-inline="false"></span>
            <span class="meta-label">{{ repository.language }}</span>
          </div>
          <div class="meta-item">
            <span class="iconify" data-icon="bi:star" data-inline="false"></span>
            <span class="meta-label">{{ repository.stargazers_count }}</span>
          </div>
          <div class="meta-item">
            <span class="iconify" data-icon="bi:fork" data-inline="false"></span>
            <span class="meta-label">{{ repository.forks_count }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="details">
          <h2 class="subtitle">Repository Details</h2>
          <div class="details-row">
            <div class="details-label">ID:</div>
            <div class="details-value">{{ repository.id }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">Created:</div>
            <div class="details-value">{{ formatDate(repository.created_at) }}</div>
          </div>
          <div class="details-row">
            <div class="details-label">Updated:</div>
            <div class="details-value">{{ formatDate(repository.updated_at) }}</div>
          </div>
          <div class="details-row" v-if="repository.homepage">
            <div class="details-label">Homepage:</div>
            <div class="details-value">
              <a :href="repository.homepage" target="_blank">{{ formatUrl(repository.homepage) }}</a>
            </div>
          </div>
          <div class="details-row">
            <div class="details-label">License:</div>
            <div class="details-value">{{ repository.license ? repository.license.name : 'None' }}</div>
          </div>
        </div>
        <div class="commits">
          <h2 class="subtitle">Latest Commits</h2>
          <ul class="commit-list">
            <li v-for="commit in commits" :key="commit.sha">
              <div class="commit-header">
                <div class="commit-message">{{ commit.commit.message }}</div>
                <div class="commit-meta">
                  <span class="commit-date">{{ formatDate(commit.commit.author.date) }}</span>
                  <span class="commit-author">{{ commit.author ? commit.author.login : commit.commit.author.name }}</span>
                </div>
              </div>
              <div class="commit-details">
                <div class="commit-id">
                  <span class="iconify" data-icon="bi:hash" data-inline="false"></span>
                  {{ commit.sha.substring(0, 7) }}
                </div>
                <div class="commit-stats">
                  <div class="commit-additions">
                    <span class="iconify" data-icon="carbon:add" data-inline="false"></span>
                    {{ commit.stats.additions }}
                  </div>
                  <div class="commit-deletions">
                    <span class="iconify" data-icon="carbon:subtract" data-inline="false"></span>
                    {{ commit.stats.deletions }}
                  </div>
                  <div class="commit-files">
                  <span class="iconify" data-icon="carbon:document" data-inline="false"></span>
                  {{ commit.files.length }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
  import axios from 'axios';
  import Loader from '../components/Loader.vue'
  export default {
    name: 'RepositoryDetails',
    data() {
      return {
        repository: {},
        commits: []
      };
    },
    methods: {
      loadRepository() {
        let username = "chopstixd"
        
        axios.get(`https://api.github.com/repos/${username}/${this.$route.params.name}`)
          .then(response => {
            this.repository = response.data;
            console.log(response.data)
            this.loadCommits();
          })
          .catch(error => {
            console.error(error);
          });
      },
      loadCommits() {
        let username = "chopstixd"
      axios.get(`https://api.github.com/repos/${username}/${this.$route.params.name}/commits`)
        .then(response => {
          this.commits = response.data.slice(0, 5);
        })
        .catch(error => {
          console.error(error);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    formatUrl(url) {
      return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    }
    },
    created() {
      this.loadRepository();
    }
  };
  </script>
  
  <style scoped>
.repository-details {
  background-color: #27285C;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.35);
  margin: 2rem auto;
  max-width: 50rem;
  padding: 2rem;
  border-color:#627BBF;
  border:6px solid;
  color:#fff;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
}

.description {
  font-size: 1.25rem;
  color: #999;
  margin: 0;
}

.meta {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.meta-label {
  font-size: 1.125rem;
  margin-left: 0.5rem;
}

.details-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.details-label {
  font-weight: bold;
  margin-right: 1rem;
  text-transform: capitalize;
}

.details-value {
  font-size: 1.125rem;
}

.commits {
  margin-top: 2rem;
}

.commit-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.commit-list li {
  margin-bottom: 1.5rem;
}

.commit-message {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
}

.commit-meta {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
color: #999;
}

.commit-link {
color: #0366d6;
text-decoration: none;
transition: color 0.2s;
}

.commit-link:hover {
color: #0540b7;
}

.commit-details {
display: flex;
justify-content: space-between;
align-items: center;
}

.commit-id {
display: flex;
align-items: center;
font-size: 0.875rem;
margin-right: 1rem;
color: #999;
}

.commit-id .iconify {
margin-right: 0.5rem;
}

.commit-stats {
display: flex;
align-items: center;
}

.commit-stats div {
display: flex;
align-items: center;
margin-right: 1rem;
font-size: 0.875rem;
}

.commit-stats div .iconify {
margin-right: 0.5rem;
}

.commit-additions {
color: #28a745;
}

.commit-deletions {
color: #cb2431;
}

@media only screen and (max-width: 768px) {
.header {
margin-bottom: 1.5rem;
}

.title {
font-size: 2rem;
}

.description {
font-size: 1rem;
}

.meta {
flex-wrap: wrap;
margin-top: 1rem;
}

.meta-item {
margin-right: 0.5rem;
margin-bottom: 0.5rem;
}

.meta-label {
font-size: 1rem;
margin-left: 0.25rem;
}

.details-row {
margin-bottom: 0.5rem;
}

.details-label {
font-size: 1rem;
}

.details-value {
font-size: 1rem;
}

.commit-message {
font-size: 1rem;
}

.commit-meta {
font-size: 0.75rem;
}

.commit-meta span {
margin-right: 0.5rem;
}

.commit-id {
font-size: 0.75rem;
}

.commit-id .iconify {
margin-right: 0.25rem;
}

.commit-stats div {
font-size: 0.75rem;
}

.commit-stats div .iconify {
margin-right: 0.25rem;
}
}
</style>