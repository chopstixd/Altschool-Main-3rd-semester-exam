<template>
    <div class="repository-list">
      <h1 class="title">Chopstixd GitHub Repositories</h1>
      <div class="repositories">
        <div class="repository" v-for="repo in repositories" :key="repo.id">
          <div class="repository-info">
            <router-link :to="{ name: 'repoDetails', params: { id: repo.id, name: repo.name } }">
              <h2 class="repository-name">{{ repo.name }}</h2>
            </router-link>
            <p class="repository-description">{{ repo.description }}</p>
            <div class="repository-details">
              <div class="repository-details-item">
                <i class="fas fa-circle"></i>
                <span class="repository-details-value">{{ repo.language }}</span>
              </div>
              <div class="repository-details-item">
                <i class="fas fa-star"></i>
                <span class="repository-details-value">{{ repo.stargazers_count }}</span>
              </div>
              <div class="repository-details-item">
                <i class="fas fa-code-branch"></i>
                <span class="repository-details-value">{{ repo.forks_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button class="pagination-button" v-if="page > 1" @click="loadRepositories(page - 1)">Previous</button>
        <button class="pagination-button" v-if="hasMore" @click="loadRepositories(page + 1)">Next</button>
      </div>
    </div>
    
  </template>

<script>
import axios from 'axios';

export default {
  name: 'RepositoryList',
  data() {
    return {
      repositories: [],
      page: 1,
      perPage: 3,
      linkHeader: '',
      hasMore: true
    };
  },
  methods: {
    loadRepositories(page) {
        let username = "chopstixd"
      axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${this.perPage}`)
        .then(response => {
          this.repositories = response.data;
          this.page = page;
          this.linkHeader = response.headers.link || '';
          this.hasMore = this.linkHeader.includes('rel="next"');
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.loadRepositories(this.page);
  }
};
</script>


<style>
.repository-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color:#27285C;
}

.repositories {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.repository {
  width: 48%;
  margin-bottom: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  background-color:#27285C;
  color:#fff;
  border:4px solid;
  border-color:#627BBF;
}

.repository:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
}

.repository-info {
  padding: 20px;
}

.repository-name {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.repository-description {
  font-size: 1rem;
  margin-bottom: 20px;
}

.repository-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.repository-details-item {
  display: flex;
  align-items: center;
}

.repository-details-item i {
  margin-right: 5px;
}

.repository-details-value {
  margin-left: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.pagination-button {
  background-color: #27285C;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination-button:hover {
  background-color: #82A3FF;
}

.pagination-button:active {
  transform: translateY(1px);
}

@media screen and (max-width: 600px) {
  .repository {
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .title {
    font-size: 1.5rem;
  }

  .repository-name {
    font-size: 1.2rem;
  }

  .repository-description {
    font-size: 0.9rem;
  }

  .repository-details {
    font-size: 0.7rem;
  }

  .pagination-button {
    padding: 8px 16px;
  }
}
</style>