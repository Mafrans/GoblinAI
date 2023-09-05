# Download GoblinAI
git clone https://github.com/Mafrans/GoblinAI.git
cd GoblinAI
git pull origin $1
git checkout $1

# Install PythonPoetry if it doesn't already exist
if ! type "poetry" > /dev/null; then
  curl -sSL https://install.python-poetry.org | POETRY_HOME=$(pwd)/.bin python3 -
  export PATH=$HOME/.local/bin:$PATH
  hash -r
fi

# Install GoblinAI dependencies
poetry install