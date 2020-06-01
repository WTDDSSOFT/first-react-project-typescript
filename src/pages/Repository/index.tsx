import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './sytle';

interface RepositoryParams {
  repository: string;
}
interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
}
/**O fomato da função(tipo)  */
const Repository: React.FC = () => {
  const [reposiory, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github explore" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          voltar
        </Link>
      </Header>

      {reposiory && (
        <RepositoryInfo>
          <header>
            <img src={reposiory.owner.avatar_url} alt={reposiory.owner.login} />
            <div>
              <strong>{reposiory.full_name}</strong>
              <p>{reposiory.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{reposiory.stargazers_count}</strong>
              <span>stars</span>
            </li>
            <li>
              <strong>{reposiory.forks_count}</strong>
              <span>forks</span>
            </li>
            <li>
              <strong>{reposiory.open_issues_count}</strong>
              <span>issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
