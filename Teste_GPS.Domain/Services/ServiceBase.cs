using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teste_GPS.Domain.Services
{
    public abstract class ServiceBase<TEntity> : IDisposable,Interfaces.Services.IServiceBase<TEntity> where TEntity: class
    {
        private readonly Interfaces.IRepositoryBase<TEntity> _repository;
        public ServiceBase(Interfaces.IRepositoryBase<TEntity> repository )
        {
            _repository = repository;
        }

        public void Add(TEntity obj)
        {
            _repository.Add(obj);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public IEnumerable<TEntity> GetAll(int QTDE)
        {
            return _repository.GetAll(QTDE);
        }

        public TEntity GetById(int id)
        {
            return _repository.GetById(id);
        }

        public void Remove(TEntity obj)
        {
            _repository.Remove(obj);
        }

        public void Update(TEntity obj)
        {
            _repository.Update(obj);
        }
    }
}
