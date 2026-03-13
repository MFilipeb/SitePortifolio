'use client';

export default function AgenteConfigPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">🛠️ Configuração do Agente no Mac mini</h1>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <p className="text-yellow-700 font-bold">Atenção!</p>
        <p className="text-yellow-600">Esta é uma página de configuração interna. Não compartilhe este link.</p>
      </div>

      <section className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">1. Homebrew</h2>
          <code className="block bg-gray-900 text-green-400 p-4 rounded text-sm mb-4">
            {`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
          </code>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">2. Ferramentas Base</h2>
          <code className="block bg-gray-900 text-green-400 p-4 rounded text-sm">
            brew install node git python
          </code>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">3. Ollama (IA Grátis)</h2>
          <p className="mb-4">Baixe em <a href="https://ollama.com" className="text-blue-600 underline">ollama.com</a> e depois rode no terminal:</p>
          <code className="block bg-gray-900 text-green-400 p-4 rounded text-sm">
            ollama run qwen2.5-coder:7b
          </code>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">4. Instalar o Agente (Aider)</h2>
          <code className="block bg-gray-900 text-green-400 p-4 rounded text-sm">
            python3 -m pip install aider-chat
          </code>
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t text-gray-500 text-sm italic">
        Configuração gerada pelo seu assistente para otimizar o ProjetoEmprego.
      </footer>
    </div>
  );
}
