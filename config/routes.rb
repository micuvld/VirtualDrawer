Rails.application.routes.draw do
  get 'session/index'

  get 'session/new'

  post 'session/login'

  get 'session/logout'

  get 'items', to: 'items#index'
  get 'items/:tag', to: 'items#show'
  put 'items', to:'items#update'
  delete 'items', to: 'items#destroy'

  get 'download/:id', to: 'download#download'

  get 'tags', to: 'tags#get_tags'
  delete 'tags', to: 'tags#destroy'
  put 'tags', to: 'tags#update'

  post 'upload', to: 'items#create'

  root 'main#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
