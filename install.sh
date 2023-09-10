# Download GoblinAI
git clone https://github.com/Mafrans/GoblinAI.git
cd GoblinAI
git pull origin dev
git checkout dev

# Install PythonPoetry if it doesn't already exist
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"

# Install GoblinAI dependencies
poetry install

# Install client dependencies
npm i --prefix client