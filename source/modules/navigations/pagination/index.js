import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';

export const ITEMS_PER_PAGE = 5;
export const PAGES_LIMIT = 7;
const { IS_ACTIVE, IS_DISABLED } = CLASSES;

const PAGINATION_CLASSES = {
  PAGINATION: 'pagination',
  LIST: 'pagination__list',
  ITEM: 'pagination__item',
  LINK: 'pagination__link',
  TEXT: 'pagination__text',
};
const {
  PAGINATION, LIST, ITEM, LINK, TEXT,
} = PAGINATION_CLASSES;

const renderPagination = (activePage, totalItems) => {
  if (totalItems > ITEMS_PER_PAGE) {
    let pages = Math.floor(Number(totalItems) / ITEMS_PER_PAGE);

    if (pages >= PAGES_LIMIT) pages = PAGES_LIMIT;

    const iteratorArray = Array(pages)
      .fill('')
      .map((_, i) => i);
    const pagesHtml = iteratorArray.map(i => {
      const number = i + 1;

      if (number === activePage) {
        return `<li class="${ITEM} is-active" data-pagination-page="${number}"><span class="${TEXT}">${number}</span></li>`;
      }
      return `<li class="${ITEM}" data-pagination-page="${number}"><a class="${LINK}" href="#">${number}</a></li>`;
    });

    return `
    <div class="${PAGINATION}">
      <ul class="${LIST}">
        <li class="${ITEM}  ${ITEM}--backward">
          <a href="#" class="${LINK}">Prev</a>
        </li>

        ${pagesHtml};

        <li class="${ITEM}  ${ITEM}--forward">
          <a href="#" class="${LINK}">Next</a>
        </li>
      </ul>
    </div>
  `;
  }
};

export const setPaginationPage = number => {
  const item = $(`.${ITEM}`);
  const activeItem = $(`.${ITEM}${IS_ACTIVE}`);
  const activeItemPage = activeItem.data('pagination-page');
  const itemToUpdate = $(`.${ITEM}[data-pagination-page=${number}]`);
  const itemToUpdatePage = itemToUpdate.data('pagination-page');
  const backward = item.first();
  const forward = item.last();

  activeItem
    .removeClass(IS_ACTIVE)
    .empty()
    .append(`<a class="${LINK}" href="#">${activeItemPage}</a>`);

  itemToUpdate
    .addClass(IS_ACTIVE)
    .empty()
    .append(`<span class="${TEXT}">${itemToUpdatePage}</span>`);

  const pageSwitchers = $(`.${ITEM}[data-pagination-page]`);

  if (pageSwitchers.first().hasClass(IS_ACTIVE)) {
    backward.addClass(IS_DISABLED);
    if (pageSwitchers.length === 1) {
      forward.addClass(IS_DISABLED);
    }
  } else if (pageSwitchers.last().hasClass(IS_ACTIVE)) {
    forward.addClass(IS_DISABLED);
  } else {
    backward.removeClass(IS_DISABLED);
    forward.removeClass(IS_DISABLED);
  }
};

const handlePaginationEffects = callback => {
  $(`.${LINK}`).on('click', function (e) {
    e.preventDefault();

    if (window.isPending) return;

    const value = $(this).text();

    if (value === 'Next') window.page++;
    else if (value === 'Prev') window.page--;
    else window.page = Number(value);

    callback();
  });
  setPaginationPage(window.page);
};

export const outputPagination = (mountSelector, switchCallback, current, total) => {
  if ($(mountSelector).length) {
    $(mountSelector).append(renderPagination(current, total));
    handlePaginationEffects(switchCallback);
  }
};
