from abc import ABC, abstractmethod


class ValueNotTypeField(Exception):
    """Exception to show that field type is not inheritate from Field"""


class Field(ABC):
    """
    Base field class for filter class, which return dict in appropriate form
    Should return format like {type: string, value: string|number|list}
    """

    @abstractmethod
    def to_dict(self):
        pass

class Equal(Field):
    def __init__(self, value):
        self.value = value

    def to_dict(self):
        return {'type': 'equal', 'value': self.value}


class Filter:
    """
    Filter class to handle data to convert in appropriate filters
    """

    def __init__(self, params):
        self.params = params

    def to_dict(self):
        v = {}
        for key, value in self.params.items():
            if not hasattr(self, key):
                continue
            filter = getattr(self, key)(value)
            if not isinstance(filter, Field):
                raise ValueNotTypeField
            v[key] = filter.to_dict()
        return v
