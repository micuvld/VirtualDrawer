class ItemsController < ApplicationController
  include FileUploader
  # GET /items
  # GET /items.json
  def index
    respond_to do |format|
      format.html
      format.json { render :json => Item.all}
    end

  end

  # GET /items/1
  # GET /items/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render :json => Item.joins(:tag).where('tag_id = ?', params[:tag])}
    end

  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  # params: file, username, tag_name, alternative_name, description
  def create
    upload_item params[params[:item_type]], params[:username], params[:alternative_name], params[:tag_name], params[:item_type], params[:details]
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    item = Item.find(params[:item_id])
    item.name = params[:name]
    item.details = params[:details]
    item.save
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    item = Item.find(params[:item_id])
    tag = Tags.find(item.tag_id)

    delete_file_from_storage item.name, params[:username], tag.name
    Item.delete(params[:item_id])
  end

  def upload_item item, username, alternative_name, tag_name, item_type, details
    new_tag_created = false
    filepath = FileUploader.upload_item(item_type, item, username, alternative_name)

    # begin
    tag = Tag.where(name: tag_name)
    if tag.empty?
      tag = Tag.create(name: tag_name)
      new_tag_created = true
    else
      tag = tag[0]
      new_tag_created = false
    end

    user = User.where(username: username)[0]

    if UserToTag.where(user_id: user.id, tag_id: tag.id).empty?
      user_to_tag = UserToTag.create(tag_id: tag[:id], user_id: user[:id])
    end

    create_generic_item item, user[:id], details, tag[:id], filepath, item_type
    puts 'after item'
    # rescue => error
    #   puts error.backtrace
    #   if new_tag_created == true
    #     Tag.delete(tag[:id])
    #   end
    # end

    redirect_to :back
  end

  def create_generic_item item, user_id, details, tag_id, path, type
    case type
    when 'note'
      name = item
    when 'file'
      details = ""
      name = item.original_filename
    end
    puts name, user_id, tag_id, path, type
    Item.create(:name => name,
        :details => details,
        :user_id => user_id,
        :tag_id => tag_id,
        :path => path,
        :item_type => type)

  end

  def delete_file_from_storage
end
