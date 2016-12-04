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
    new_tag_created = false
    filepath = FileUploader.upload_file(params[:file],
                                        params[:username],
                                        params[:alternative_name])

    begin
    tag = Tag.where(name: params[:tag_name])
    if tag.empty?
      tag = Tag.create(name: params[:tag_name])
      new_tag_created = true
    else
      tag = tag[0]
    end

    user = User.where(username: params[:username])[0]

    if UserToTag.where(user_id: user.id, tag_id: tag.id).empty?
      user_to_tag = UserToTag.create(tag_id: tag[:id], user_id: user[:id])
    end

    item = Item.create(name: params[:file].original_filename,
                description: params[:description],
                user_id: user[:id],
                tag_id: tag[:id],
                path: filepath)

    rescue
      if new_tag_created == true
        Tag.delete(tag[:id])
      end
    end

    redirect_to :back
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
end
