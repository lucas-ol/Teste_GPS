using System;
using System.Collections;
using System.Collections.Generic;

namespace Teste_GPS.Domain.Interfaces
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        void Add(TEntity obj);
        TEntity GetById(int id);
        IEnumerable<TEntity> GetAll(int QTDE);
        void Update(TEntity obj);
        void Remove(TEntity obj);

    }
}
