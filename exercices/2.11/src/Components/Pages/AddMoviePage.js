import { clearPage, renderPageTitle } from '../../utils/render';

// const movies = [];

const AddMoviePage = () => {
  clearPage();
  renderPageTitle('Add Movie');
  renderForm();
};

function renderForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'add-movie-form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', '/add');

  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('placeholder', 'Title');

  const duration = document.createElement('input');
  duration.setAttribute('type', 'number');
  duration.setAttribute('name', 'duration');
  duration.setAttribute('placeholder', 'Duration');

  const budget = document.createElement('input');
  budget.setAttribute('type', 'number');
  budget.setAttribute('name', 'budget');
  budget.setAttribute('placeholder', 'Budget');

  const link = document.createElement('input');
  link.setAttribute('type', 'text');
  link.setAttribute('name', 'link');
  link.setAttribute('placeholder', 'Link');

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Add');

  form.appendChild(title);
  form.appendChild(duration);
  form.appendChild(budget);
  form.appendChild(link);
  form.appendChild(submit);

  const main = document.querySelector('main');
  main.appendChild(form);
}

export default AddMoviePage;
