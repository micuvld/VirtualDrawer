Rails.application.routes.draw do
  get 'items', to: 'items#index'
  get 'items/:tag', to: 'items#show'

  get 'download/:id', to: 'download#download'

  get 'tags', to: 'tags#get_tags'
  delete 'tags', to: 'tags#destroy'
  put 'tags', to: 'tags#update'

  post 'upload', to: 'items#create'

  root 'main#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
